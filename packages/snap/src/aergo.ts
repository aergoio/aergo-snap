const url = 'http://localhost/v1';

export const getBlockNumber = async () => {
    const response = await fetch(`${url}/getBlockNumber`);
    return response.text();
};

export const getAccount = async (address: string) => {
    const response = await fetch(`${url}/getState?account=${address}`);
    return response.text();
};

export const sendTransaction = async (data: any) => {
    const response = await fetch(`${url}/sendSignedTransaction`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.text();
};
