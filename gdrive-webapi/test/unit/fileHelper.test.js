import Routes from '../../src/routes.js'
import { jest, expect, test, describe } from '@jest/globals';
import fs from 'fs'
import FileHelper from '../../src/fileHelper.js';

describe('#FileHelper', () => {
  describe('#getFileStatus', () => {
    test('it should return files statuses in correct format', async () => {
      const statMock = {
        dev: 66309,
        mode: 33204,
        nlink: 1,
        uid: 1000,
        gid: 1000,
        rdev: 0,
        blksize: 4096,
        ino: 3039022,
        size: 367935,
        blocks: 720,
        atimeMs: 1631469042423.6013,
        mtimeMs: 1631469042335,
        ctimeMs: 1631469042331.5962,
        birthtimeMs: 1631468933788.7014,
        atime: '2021-09-12T17:50:42.424Z',
        mtime: '2021-09-12T17:50:42.335Z',
        ctime: '2021-09-12T17:50:42.332Z',
        birthtime: '2021-09-12T17:48:53.789Z'
      }
      
      const mockUser = 'daniel'
      process.env.USER = mockUser
      const filename = 'file.png'
      
      jest.spyOn(fs.promises, fs.promises.readdir.name)
        .mockResolvedValue([filename])

      jest.spyOn(fs.promises, fs.promises.stat.name)
        .mockResolvedValue(statMock)

      const result = await FileHelper.getFilesStatus("/tmp")

      const expectedResult = [
        {
          size: "368 kB",
          lastModified: statMock.birthtime,
          owner: mockUser,
          file: filename
        }
      ]

      expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`)
      expect(result).toMatchObject(expectedResult)
    })
  })
})
