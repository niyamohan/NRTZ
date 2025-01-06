import fs from 'fs';
import path from 'path';
import { formatDate } from '../lib/utils';
import { AllBasicSchemas, AllBasicSchemasData } from '../lib/zodSchemas'
import { CommentSchema } from '../models/Comment';


// JSON ファイルパス
const mockDbPath = path.resolve(process.cwd(), 'src', 'db.json');

// データ（仮DB）
let allBasicSchemasData: AllBasicSchemasData = {
  accounts: [],
  patients: [],
  comments: [],
  maxCommentId: 0,
};

// ロードモックデータ
function loadMockData() {
  try {
    const data = fs.readFileSync(mockDbPath, 'utf-8');
    const parsedData = JSON.parse(data);

    // Zod でデータを検証
    allBasicSchemasData = AllBasicSchemas.parse(parsedData);

    if (allBasicSchemasData.comments.length > 0) {
      for (const comment of allBasicSchemasData.comments) {
        if (comment.id > allBasicSchemasData.maxCommentId) {
          allBasicSchemasData.maxCommentId = comment.id;
        }
      }
    }

  } catch (error) {
    console.error('Failed to load or validate mock data:', error);
  }
}

// APP起動時にモックデータをロードする
loadMockData();

// モックDBの操作
export const fakeDb = {
  // アカウントを取得する
  getAccounts: () => allBasicSchemasData.accounts,

  // 患者リストを取得する
  getPatients: () => allBasicSchemasData.patients,

  // 患者を取得する
  getPatientsByPatientId: (patientId: number) => {
    // 获取患者信息
    const patient = allBasicSchemasData.patients.find((patient) => patient.id === patientId);
    if (!patient) {
      throw new Error(`Patient with ID ${patientId} not found.`);
    }

    // 获取与患者相关的评论
    const comments = allBasicSchemasData.comments.filter((comment) => comment.patientId === patientId);

    // 返回患者及评论的组合数据
    return {
      patient,
      comments,
    };
  },

  // 患者にコメントを追加する
  addComment: (content: string, patientId: number, accountId: number, accountName: string) => {

    const newComment = CommentSchema.parse({
      id: ++allBasicSchemasData.maxCommentId,
      content,
      patientId,
      accountId,
      accountName,
      createdAt: formatDate(new Date()),
      updatedAt: formatDate(new Date()),
    });
    allBasicSchemasData.comments.push(newComment);

    // JSON に保存
    fs.writeFileSync(mockDbPath, JSON.stringify(allBasicSchemasData, null, 2));

    loadMockData();
    return newComment;
  },

  // コメントを更新する
  updateComment: (commentId: number, newContent: string) => {
    const commentIndex = allBasicSchemasData.comments.findIndex((comment) => comment.id === commentId);
    if (commentIndex === -1) {
      throw new Error(`Comment with ID ${commentId} not found.`);
    }

    // コメントと時間を更新する
    allBasicSchemasData.comments[commentIndex].content = newContent;
    allBasicSchemasData.comments[commentIndex].updatedAt = formatDate(new Date());

    // JSON に保存
    fs.writeFileSync(mockDbPath, JSON.stringify(allBasicSchemasData, null, 2));

    loadMockData();
    return allBasicSchemasData.comments[commentIndex];
  },

  // コメントを削除する
  deleteComment: (commentId: number) => {
    const commentIndex = allBasicSchemasData.comments.findIndex((comment) => comment.id === commentId);
    if (commentIndex === -1) {
      throw new Error(`Comment with ID ${commentId} not found.`);
    }

    // コメントを削除する
    const deletedComment = allBasicSchemasData.comments.splice(commentIndex, 1)[0];

    // JSON に保存
    fs.writeFileSync(mockDbPath, JSON.stringify(allBasicSchemasData, null, 2));

    loadMockData();
    return deletedComment;
  },
};
