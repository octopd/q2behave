import { BlobServiceClient } from '@azure/storage-blob'
import asyncHandler from 'express-async-handler'

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING as string

const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
)

const containerClient = blobServiceClient.getContainerClient('wearosdata')


interface File {
    name: string
    size: number
    properties: {
        contentLength: number
    }
}

interface Directory {
    name: string
    files: File[]
}

// @desc    Get Directories List
// @route   GET /api/storage/directories
// @access  Private
const getDirectories = asyncHandler(async (req, res) => {

    let response = []

    for await (const directory of containerClient.listBlobsByHierarchy('/')) {

        let files = []
        let size = 0
        let iter = containerClient.listBlobsFlat({ prefix: directory.name })

        for await (const item of iter) {
            const bytes = item.properties ? Number(item.properties.contentLength) : 0

            size = size + bytes
            files.push(item)
        }

        response.push({ name: directory.name.slice(0, -1), size, files })
    }

    if (response.length) {
        res.status(201).json(response)
    } else {
        res.status(404).send('Directory listing not found')
    }
})

export { getDirectories }
