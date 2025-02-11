export enum APIMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export const APIRoute = {
  createAd: { method: [APIMethod.POST], path: `/items` },
  getAds: { method: [APIMethod.GET], path: `/items` },
  getAdById: { method: [APIMethod.GET], path: `/items/` },
  updateAdById: { method: [APIMethod.PUT], path: `/items/:id` },
  deleteAdById: { method: [APIMethod.DELETE], path: `/items/:id` },
};
