import { GetListArticles, IArticlePayload, UpdateArticle } from "./interfaces";

import { IArticle } from "@/domain/article";
import { PaginationResponse } from "@/domain/base";
import { apiService } from "../apiService";

export const create = (payload: IArticlePayload) =>
  apiService.post("articles", payload);

export const update = ({ id, payload }: UpdateArticle): Promise<IArticle> =>
  apiService.patch(`articles/${id}`, payload);

export const detail = (id: string): Promise<IArticle> =>
  apiService.get(`articles/${id}`);

export const list = (
  params?: GetListArticles
): Promise<PaginationResponse<IArticle[]>> =>
  apiService.get("articles", { params });
