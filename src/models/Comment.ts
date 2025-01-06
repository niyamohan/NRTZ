import { z } from 'zod';

// 评论数据的 Schema
export const CommentSchema = z.object({
  id: z.number(), // 评论 ID，数字类型
  content: z.string(), // 评论内容，字符串类型
  patientId: z.number(), // 患者 ID，数字类型
  accountId: z.number(), // 账户 ID，数字类型
  accountName: z.string(), // 账户名称，字符串类型
  createdAt: z.string(), // 创建时间，字符串类型
  updatedAt: z.string(), // 更新时间，字符串类型
});

// 新增评论用的 Schema
export const NewCommentSchema = z.object({
  content: z.string().min(1, "评论内容是必填的"), // 评论内容，不能为空
  patientId: z.number(), // 患者 ID，数字类型
});

// 评论 Props 数据的 Schema
export const CommentCardPropsSchema = z.object({
  comment: CommentSchema, // 评论对象，类型是 CommentSchema
  isEditingFlag: z.boolean(), // 是否在编辑状态，布尔类型
  isProcessing: z.boolean(), // 是否正在处理，布尔类型
  refreshComments: z.function().returns(z.promise(z.void())), // 刷新评论的函数，返回 Promise
  deleteComment: z.function().args(z.number()).returns(z.promise(z.void())), // 删除评论的函数，接受评论 ID 参数并返回 Promise
  editComment: z.function().args(z.number(), z.string()).returns(z.promise(z.void())), // 编辑评论的函数，接受评论 ID 和内容参数并返回 Promise
});

// 用 CommentCardPropsSchema 推导出 CommentCardProps 类型
export type CommentCardProps = z.infer<typeof CommentCardPropsSchema>;

// 评论列表 Props 数据的 Schema
export const CommentListPropsSchema = z.object({
  comments: z.array(CommentSchema).nullable(), // 评论列表，数组类型，可以为空
  isEditingFlag: z.boolean(), // 是否在编辑状态，布尔类型
  isProcessing: z.boolean(), // 是否正在处理，布尔类型
  refreshComments: z.function().returns(z.promise(z.void())), // 刷新评论的函数，返回 Promise
  deleteComment: z.function().args(z.number()).returns(z.promise(z.void())), // 删除评论的函数，接受评论 ID 参数并返回 Promise
  editComment: z.function().args(z.number(), z.string()).returns(z.promise(z.void())), // 编辑评论的函数，接受评论 ID 和内容参数并返回 Promise
  addComment: z.function().args(z.string()).returns(z.promise(z.void())), // 新增评论的函数，接受评论内容参数并返回 Promise
});

export type CommentListProps = z.infer<typeof CommentListPropsSchema>;

// 评论操作的 Schema
export const EditCommentSchema = z.object({
  id: z.number(), // 评论 ID，数字类型
  content: z.string(), // 评论内容，字符串类型
});

export const DeleteCommentSchema = z.object({
  id: z.number(), // 评论 ID，数字类型
});

// 用于数据库的评论 Schema
export const CommentsSchema = z.array(CommentSchema); // 评论的数组，数组中的每个元素是 CommentSchema 类型

export type Comment = z.infer<typeof CommentSchema>;