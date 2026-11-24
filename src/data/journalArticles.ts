import { BATCH_1_ARTICLES } from "./articles/batch1";
import { BATCH_2_ARTICLES } from "./articles/batch2";
import { BATCH_3_ARTICLES } from "./articles/batch3";
import { BATCH_4_ARTICLES } from "./articles/batch4";

export interface JournalArticle {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  publishDay: string;
  publishSlot: "Morning" | "Evening";
  publishDate: string; // ISO Date YYYY-MM-DD
  targetKeyword: string;
  pastel: string;
  content: string;
}

export const ATELIER_JOURNAL_ARTICLES: Record<string, JournalArticle> = {
  ...BATCH_1_ARTICLES,
  ...BATCH_2_ARTICLES,
  ...BATCH_3_ARTICLES,
  ...BATCH_4_ARTICLES,
};
