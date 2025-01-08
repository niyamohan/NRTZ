import fs from 'fs/promises'

export const CONFIG = {
  DB_JSON_DIRECTORY: './db',
}


await fs.mkdir(CONFIG.DB_JSON_DIRECTORY, { recursive: true })

export const ensureDataFile = async (typeName: string) => {
  const dataFilePath = `${CONFIG.DB_JSON_DIRECTORY}/${typeName}.json`
  if (
    !(await fs
      .access(dataFilePath)
      .then(() => true)
      .catch(() => false))
  ) {
    await fs.writeFile(dataFilePath, '[]')
  }
}

export const readDataFile = async <T>(typeName: string): Promise<T[]> => {
  await ensureDataFile(typeName)
  const dataFilePath = `${CONFIG.DB_JSON_DIRECTORY}/${typeName}.json`
  const data = await fs.readFile(dataFilePath, 'utf-8')
  return JSON.parse(data)
}

export const writeDataFile = async <T>(typeName: string, data: T[]) => {
  await ensureDataFile(typeName)
  const dataFilePath = `${CONFIG.DB_JSON_DIRECTORY}/${typeName}.json`
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2))
}
