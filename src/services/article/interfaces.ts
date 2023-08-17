import { BaseQuery, PaginationParams } from "@/domain/base";

export interface GetListArticles extends BaseQuery, PaginationParams {
  textSearch?: string;
}

export interface IArticlePayload {
  title: string;
  description: string;
  content: string;
}

export interface UpdateArticle {
  id: string;
  payload: IArticlePayload;
}
