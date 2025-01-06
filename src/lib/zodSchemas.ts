// 导入 Account、Comment、Patient 模块中的 schemas 和接口
import * as AccountSchemas from '../models/Account';
import * as CommentSchemas from '../models/Comment';
import * as PatientSchemas from '../models/Patient';

// -------------------- 导出所有的 schemas --------------------

// 账户相关的 schema
export const AccountSchema = AccountSchemas.AccountSchema;  // 账户数据的 schema
export const AccountContextTypeSchema = AccountSchemas.AccountContextTypeSchema;  // 账户上下文的 schema
export const AccountSelectorPropsSchema = AccountSchemas.AccountSelectorPropsSchema;  // 账户选择器 props 的 schema

// 评论相关的 schema
export const CommentSchema = CommentSchemas.CommentSchema;  // 评论数据的 schema
export const NewCommentSchema = CommentSchemas.NewCommentSchema;  // 新评论的 schema
export const CommentCardPropsSchema = CommentSchemas.CommentCardPropsSchema;  // 评论卡片组件的 props schema
export const CommentListPropsSchema = CommentSchemas.CommentListPropsSchema;  // 评论列表组件的 props schema
export const EditCommentSchema = CommentSchemas.EditCommentSchema;  // 编辑评论的 schema
export const DeleteCommentSchema = CommentSchemas.DeleteCommentSchema;  // 删除评论的 schema
export const CommentsSchema = CommentSchemas.CommentsSchema;  // 评论数据的 schema 数组

// 患者相关的 schema
export const PatientSchema = PatientSchemas.PatientSchema;  // 患者数据的 schema
export const PatientDetailsPropsSchema = PatientSchemas.PatientDetailsPropsSchema;  // 患者详情组件的 props schema

// -------------------- 导出所有的接口类型 --------------------

// 账户相关的类型接口
export interface Account extends AccountSchemas.Account {}  // 从 AccountSchema 推导出的 Account 类型
export interface AccountContextType extends AccountSchemas.AccountContextType {}  // 从 AccountContextTypeSchema 推导出的 AccountContextType 类型
export interface AccountSelectorProps extends AccountSchemas.AccountSelectorProps {}  // 从 AccountSelectorPropsSchema 推导出的 AccountSelectorProps 类型

// 评论相关的类型接口
export interface Comment extends CommentSchemas.Comment {}  // 从 CommentSchema 推导出的 Comment 类型
export interface NewComment extends CommentSchemas.NewComment {}  // 从 NewCommentSchema 推导出的 NewComment 类型
export interface CommentCardProps extends CommentSchemas.CommentCardProps {}  // 从 CommentCardPropsSchema 推导出的 CommentCardProps 类型
export interface CommentListProps extends CommentSchemas.CommentListProps {}  // 从 CommentListPropsSchema 推导出的 CommentListProps 类型
export interface EditComment extends CommentSchemas.EditComment {}  // 从 EditCommentSchema 推导出的 EditComment 类型
export interface DeleteComment extends CommentSchemas.DeleteComment {}  // 从 DeleteCommentSchema 推导出的 DeleteComment 类型

// 患者相关的类型接口
export interface Patient extends PatientSchemas.Patient {}  // 从 PatientSchema 推导出的 Patient 类型
export interface PatientDetailsProps extends PatientSchemas.PatientDetailsProps {}  // 从 PatientDetailsPropsSchema 推导出的 PatientDetailsProps 类型