// ? Button
export enum VariantOptions {
  PRIMARY = 'primary',
  PRIMARY_OUTLINE = 'primary-outline',
  SECONDARY = 'secondary',
  SECONDARY_OUTLINE = 'secondary-outline',
  GRADATION = 'gradation',
  FONT_GRADATION = 'font-gradation',
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

export type Variant =
  | 'primary'
  | 'primary-outline'
  | 'secondary'
  | 'secondary-outline'
  | 'gradation'
  | 'font-gradation'
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

// ? PopperTooltip
export declare const top: 'top';
export declare const bottom: 'bottom';
export declare const right: 'right';
export declare const left: 'left';

type BasePlacement = typeof top | typeof bottom | typeof right | typeof left;

type AutoPlacement = 'auto' | 'auto-start' | 'auto-end';

type VariationPlacement =
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'right-start'
  | 'right-end'
  | 'left-start'
  | 'left-end';

export type Placement = AutoPlacement | BasePlacement | VariationPlacement;
