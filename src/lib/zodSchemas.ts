import { z } from 'zod';
import { AccountSchema } from '../models/Account';
import { CommentSchema } from '../models/Comment';
import { PatientSchema } from '../models/Patient';

// 将所有的 schema 和接口集成到一个对象中，便于统一管理和导出
export const AllBasicSchemas = z.object({
  accounts: z.array(AccountSchema),  // 账户数组，使用 AccountSchema
  patients: z.array(PatientSchema),  // 患者数组，使用 PatientSchema
  comments: z.array(CommentSchema),  // 评论数组，使用 CommentSchema
  maxCommentId: z.number(),          // 最大评论 ID，数字类型
});

// 推导出整个 allBasicSchemas 的类型
export type AllBasicSchemasData = z.infer<typeof AllBasicSchemas>;