import { S3 } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { t } from 'i18next'
import { nanoid } from 'nanoid'
import { toast } from 'react-hot-toast/headless'
export interface StoreFilesTypes {
	file: any
	bucket: string
	s3: any
	type: 'assets' | 'json'
}

export interface AwsStorageClientTypes {
	s3: any
	bucket: string
	everlandUrl: string
	storeFilesUpload: (data: StoreFilesTypes) => Promise<{ data: any; url: string; key: string }>
	makeFileObjects: (obj: object) => void
}

class AwsStorageClient {
	s3: any
	bucket: string
	everlandUrl: string
	constructor() {
		this.s3 = new S3({
			credentials: {
				accessKeyId: process.env.accesskeyId as string,
				secretAccessKey: process.env.secretaccessKey as string,
			},
			region: 'ap-southeast-1',
		})
		this.bucket = process.env.bucket as string
		this.everlandUrl = `https://storage.popp.club`
	}

	async storeFilesUpload({ file, s3, bucket, type }: StoreFilesTypes): Promise<{ data: any; url: string; key: string }> {
		console.log('bucket', bucket)
		const keyUuid = type === 'json' ? `${nanoid(24)}.${file.name.split('.')[1]}` : `${nanoid(24)}.png`
		const Key = `echo/${type}/${keyUuid}`
		try {
			const params = {
				Bucket: bucket,
				Key,
				Body: file,
				ContentType: file.type,
			}
			const task = new Upload({
				client: s3,
				params,
			})
			await task.done()
			const data = await s3.headObject({ Bucket: bucket, Key })
			return await { data, url: `/${Key}`, key: keyUuid }
		} catch (error: any) {
			console.log(error.message)
			setTimeout(() => {
				toast.error(t('publish.imageError'))
			}, 1000)
			return { data: undefined, url: '', key: '' }
		}
	}

	makeFileObjects(obj: object) {
		const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
		const files = new File([blob], 'profile.json')
		return files
	}
}

export default AwsStorageClient
