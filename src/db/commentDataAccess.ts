import AsyncLock from 'async-lock';
import { readDataFile, writeDataFile } from '@/db/db_config';
import { Comment, CommentSchemas } from '@/schemas/commentSchemas';
import { Patient } from '@/schemas/patientSchemas';
import { formatDate } from '@/lib/utils';
import { patientsDb } from './patientDataAccess';

const lock = new AsyncLock();
const withLock = <T>(fn: (...args: any[]) => Promise<T>) => {
  return (...args: any[]): Promise<T> => {
    return lock.acquire('comments', () => fn(...args));
  };
};

export const commentsDb = {
  findManyByPatientId: withLock(async (patientId: number) => {
    const patients: Patient[] = await readDataFile<Patient>('patients');
    const comments: Comment[] = await readDataFile<Comment>('comments');

    const patient = patients.find((p) => p.id === patientId);
    if (!patient) {
      throw new Error(`Patient with ID ${patientId} not found.`);
    }

    const relatedComments = comments.filter((comment) => comment.patientId === patientId);

    return {
      patient,
      comments: relatedComments,
    };
  }),

  deleteComment: withLock(async (commentId: number) => {
    const comments: Comment[] = await readDataFile<Comment>('comments');
    const newComments = comments.filter((comment) => comment.id !== commentId);

    await writeDataFile('comments', newComments);
    // 更新患者的 updatedAt
    await patientsDb.updateUpdatedAtById(newComments[0].patientId);
  }),

  updateComment: withLock(async (commentId: number, newContent: string) => {
    const comments: Comment[] = await readDataFile<Comment>('comments');
    const commentIndex = comments.findIndex((comment) => comment.id === commentId);

    if (commentIndex === -1) {
      throw new Error(`Comment with ID ${commentId} not found.`);
    }

    // コメントと時間を更新する
    comments[commentIndex].content = newContent;
    comments[commentIndex].updatedAt = formatDate(new Date());

    await writeDataFile('comments', comments);

    // 更新患者的 updatedAt
    await patientsDb.updateUpdatedAtById(comments[commentIndex].patientId);


    return comments[commentIndex];
  }),

  addComment: withLock(async (content: string, patientId: number, accountId: number, accountName: string) => {
    // 現在のすべてのコメントを取得
    const comments: Comment[] = await readDataFile<Comment>('comments');

    // 最大の ID を取得し、それに +1 する
    const maxId = comments.reduce((max, comment) => Math.max(max, comment.id), 0);
    const newId = maxId + 1;

    // 新しいコメントを作成
    const newComment = CommentSchemas.parse({
      id: newId,
      content,
      patientId,
      accountId,
      accountName,
      createdAt: formatDate(new Date()),
      updatedAt: formatDate(new Date()),
    });

    // 新しいコメントを配列に追加
    comments.push(newComment);

    // コメントを保存
    await writeDataFile('comments', comments);

    // 更新患者的 updatedAt
    await patientsDb.updateUpdatedAtById(patientId);

    return newComment;
  }),
};