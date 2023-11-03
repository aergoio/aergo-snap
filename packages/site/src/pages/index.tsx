import { useContext, useState } from 'react';
import styled from 'styled-components';
import { MetamaskActions, MetaMaskContext } from '../hooks';
import { connectSnap, getSnap, isLocalSnap, sendHello, shouldDisplayReconnectButton, getAddress, getBlockNumber, getAccount, sendAergo } from '../utils';
import { ConnectButton, InstallFlaskButton, ReconnectButton, SendHelloButton, Card, CallButton } from '../components';
import { defaultSnapOrigin } from '../config';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    margin-top: 7.6rem;
    margin-bottom: 7.6rem;
    ${({ theme }) => theme.mediaQueries.small} {
        padding-left: 2.4rem;
        padding-right: 2.4rem;
        margin-top: 2rem;
        margin-bottom: 2rem;
        width: auto;
    }
`;

const Heading = styled.h1`
    margin-top: 0;
    margin-bottom: 2.4rem;
    text-align: center;
`;

const Span = styled.span`
    color: ${props => props.theme.colors.primary.default};
`;

const Subtitle = styled.p`
    font-size: ${({ theme }) => theme.fontSizes.large};
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 0;
    ${({ theme }) => theme.mediaQueries.small} {
        font-size: ${({ theme }) => theme.fontSizes.text};
    }
`;

const CardContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 64.8rem;
    width: 100%;
    height: 100%;
    margin-top: 1.5rem;
`;

const Notice = styled.div`
    background-color: ${({ theme }) => theme.colors.background.alternative};
    border: 1px solid ${({ theme }) => theme.colors.border.default};
    color: ${({ theme }) => theme.colors.text.alternative};
    border-radius: ${({ theme }) => theme.radii.default};
    padding: 2.4rem;
    margin-top: 2.4rem;
    max-width: 60rem;
    width: 100%;

    & > * {
        margin: 0;
    }
    ${({ theme }) => theme.mediaQueries.small} {
        margin-top: 1.2rem;
        padding: 1.6rem;
    }
`;

const ErrorMessage = styled.div`
    background-color: ${({ theme }) => theme.colors.error.muted};
    border: 1px solid ${({ theme }) => theme.colors.error.default};
    color: ${({ theme }) => theme.colors.error.alternative};
    border-radius: ${({ theme }) => theme.radii.default};
    padding: 2.4rem;
    margin-bottom: 2.4rem;
    margin-top: 2.4rem;
    max-width: 60rem;
    width: 100%;
    ${({ theme }) => theme.mediaQueries.small} {
        padding: 1.6rem;
        margin-bottom: 1.2rem;
        margin-top: 1.2rem;
        max-width: 100%;
    }
`;

const Index = () => {
    const [state, dispatch] = useContext(MetaMaskContext);
    const [address, setAddress] = useState('');
    const [account, setAccount] = useState('');
    const [blocknumber, setBlocknumber] = useState();

    const [receiverAddress, setReceiverAddress] = useState('AmNdzAYv3dYKFtPRgfUMGppGwBJS2JvZLRTF9gRruF49vppEepgj');
    const [amount, setAmount] = useState('');

    const isMetaMaskReady = isLocalSnap(defaultSnapOrigin) ? state.isFlask : state.snapsDetected;

    const handleConnectClick = async () => {
        try {
            await connectSnap();
            const installedSnap = await getSnap();

            dispatch({
                type: MetamaskActions.SetInstalled,
                payload: installedSnap,
            });
        } catch (e) {
            console.error(e);
            dispatch({ type: MetamaskActions.SetError, payload: e });
        }
    };

    const handleSendHelloClick = async () => {
        try {
            await sendHello();
        } catch (e) {
            console.error(e);
            dispatch({ type: MetamaskActions.SetError, payload: e });
        }
    };

    const handleGetAddress = async () => {
        try {
            const info = await getAddress();
            setAddress(info);
        } catch (e) {
            console.error(e);
            dispatch({ type: MetamaskActions.SetError, payload: e });
        }
    };

    const handleGetAccount = async () => {
        try {
            const info = await getAccount(address);
            setAccount(info);
        } catch (e) {
            console.error(e);
            dispatch({ type: MetamaskActions.SetError, payload: e });
        }
    };

    const handleGetBlockNumber = async () => {
        try {
            const info = await getBlockNumber();
            setBlocknumber(info);
        } catch (e) {
            console.error(e);
            dispatch({ type: MetamaskActions.SetError, payload: e });
        }
    };

    const handleSendAergo = async () => {
        const account = await getAccount(address);
        const info = await getBlockNumber();

        var tx: any = {
            from: address,
            to: receiverAddress,
            amount: String(BigInt(Math.floor(Number(amount) * 1e18))),
            type: 4,
            nonce: account.nonce + 1,
            chainIdHash: info.best_chain_id_hash,
        };

        try {
            const info = await sendAergo(tx);
            if (typeof info === 'string') {
                alert(info);
            } else {
                alert(info.results[0].hash);
                handleGetAccount();
            }
        } catch (e) {
            console.error(e);
            dispatch({ type: MetamaskActions.SetError, payload: e });
        }
    };

    return (
        <Container>
            <Heading>
                Welcome to <Span>template-snap</Span>
            </Heading>
            <Subtitle>
                Get started by editing <code>src/index.ts</code>
            </Subtitle>
            <CardContainer>
                {state.error && (
                    <ErrorMessage>
                        <b>An error happened:</b> {state.error.message}
                    </ErrorMessage>
                )}
                {!isMetaMaskReady && (
                    <Card
                        content={{
                            title: 'Install',
                            description:
                                'Snaps is pre-release software only available in MetaMask Flask, a canary distribution for developers with access to upcoming features.',
                            button: <InstallFlaskButton />,
                        }}
                        fullWidth
                    />
                )}
                {!state.installedSnap && (
                    <Card
                        content={{
                            title: 'Connect',
                            description: 'Get started by connecting to and installing the example snap.',
                            button: <ConnectButton onClick={handleConnectClick} disabled={!isMetaMaskReady} />,
                        }}
                        disabled={!isMetaMaskReady}
                    />
                )}
                {shouldDisplayReconnectButton(state.installedSnap) && (
                    <Card
                        content={{
                            title: 'Reconnect',
                            description:
                                'While connected to a local running snap this button will always be displayed in order to update the snap if a change is made.',
                            button: <ReconnectButton onClick={handleConnectClick} disabled={!state.installedSnap} />,
                        }}
                        disabled={!state.installedSnap}
                    />
                )}
                <Card
                    content={{
                        title: 'GetBlockNumber',
                        description: `best_height : ${blocknumber?.best_height || ''}`,
                        button: <CallButton onClick={handleGetBlockNumber} disabled={!state.installedSnap} />,
                    }}
                    disabled={!state.installedSnap}
                    fullWidth={false}
                />
                <Card
                    content={{
                        title: 'Get Aergo address',
                        description: address,
                        button: <CallButton onClick={handleGetAddress} disabled={!state.installedSnap} />,
                    }}
                    disabled={!state.installedSnap}
                    fullWidth={address ? true : false}
                />

                <Card
                    content={{
                        title: 'Get Account',
                        description: account?.balance || '',
                        button: <CallButton onClick={handleGetAccount} disabled={address ? false : true} />,
                    }}
                    disabled={address ? false : true}
                    fullWidth={false}
                />

                <Card
                    content={{
                        title: 'Send Aergo',
                        description: [
                            <input placeholder="receiver address" value={receiverAddress} onChange={e => setReceiverAddress(e.target.value)} />,
                            <input placeholder="amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} />,
                        ],
                        button: <CallButton onClick={handleSendAergo} disabled={!state.installedSnap || !address} />,
                    }}
                    disabled={!state.installedSnap || !address}
                    fullWidth={false}
                />

                <Notice>
                    <p>
                        Please note that the <b>snap.manifest.json</b> and <b>package.json</b> must be located in the server root directory and the bundle must
                        be hosted at the location specified by the location field.
                    </p>
                </Notice>
            </CardContainer>
        </Container>
    );
};

export default Index;
