export type Product = {
  Name: string;
  ShortDescription: string;
  FullDescription: string;
  SeName: string;
  Sku: string;
  ProductType: string;
  MarkAsNew: true;
  ProductPrice: ProductPrice;
  PictureModels: PictureModels[];
  ProductSpecificationModel: ProductSpecificationModel;
  ReviewOverviewModel: ReviewOverviewModel;
  Id: number;
  CustomProperties: object;
  Discounts: Discount[];
};
export type Discount = {
  Name: string;
  AdminComment: any;
  DiscountTypeId: number;
  UsePercentage: boolean;
  DiscountPercentage: number;
  DiscountAmount: number;
  MaximumDiscountAmount?: number;
  StartDateUtc?: string;
  EndDateUtc?: string;
  RequiresCouponCode: boolean;
  CouponCode?: string;
  IsCumulative: boolean;
  DiscountLimitationId: number;
  LimitationTimes: number;
  MaximumDiscountedQuantity?: number;
  AppliedToSubCategories: boolean;
  IsActive: boolean;
  DiscountType: string;
  DiscountLimitation: string;
  Id: number;
};
export type ProductPrice = {
  OldPrice: string;
  OldPriceValue: number;
  Price: string;
  PriceValue: number;
  PriceWithDiscount: string;
  PriceWithDiscountValue: number;
  BasePricePAngV: string;
  BasePricePAngVValue: number;
  DisableBuyButton: boolean;
  DisableWishlistButton: boolean;
  DisableAddToCompareListButton: boolean;
  AvailableForPreOrder: boolean;
  PreOrderAvailabilityStartDateTimeUtc: Date;
  IsRental: boolean;
  ForceRedirectionAfterAddingToCart: boolean;
  DisplayTaxShippingInfo: boolean;
  CustomProperties: object;
};
export type PictureModels = {
  ImageUrl: string;
  ThumbImageUrl: string;
  FullSizeImageUrl: string;
  Title: string;
  AlternateText: string;
  CustomProperties: object;
};

export type ReviewOverviewModel = {
  ProductId: number;
  RatingSum: number;
  TotalReviews: number;
  AllowCustomerReviews: true;
  CanAddNewReview: true;
  CustomProperties: object;
};

export type ProductSpecificationModel = {
  Groups: SpecificationGroupModel[];
  CustomProperties: object;
};
export type SpecificationGroupModel = {
  Name: string;
  Attributes: SpecificationAttributesModel[];
  Id: 0;
  CustomProperties: object;
};
export type SpecificationAttributesModel = {
  Name: string;
  Values: SpecificationAttributesValuesModel[];
  Id: 0;
  CustomProperties: object;
};
export type SpecificationAttributesValuesModel = {
  AttributeTypeId: number;
  ValueRaw: string;
  ColorSquaresRgb: string;
  CustomProperties: object;
};

export interface ProductListResponse {
  Products: Product[];
}
