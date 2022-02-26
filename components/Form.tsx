import { Wallet } from 'mintbase'
import {useForm} from 'react-hook-form'
import {useWallet} from '../services/providers/MintbaseWalletContext'
import { MetadataField } from 'mintbase'
import Image from '../assets/Panda_Outline.png'

const  Form = () => {
    const {wallet,isConnected,details} = useWallet()
    const {register, handleSubmit,formState: { errors },
 } = useForm()

    const onSubmit = async (data: any) => {

        if(!isConnected) return
        if(!wallet) return

        const coverImage = 'https://ipfs.io/ipfs/bafybeif5zpfv3pwrwcjrvvcjadq524cusqrz6hqo2e73vffehvr42o5gzm'

        // console.log(data)
        console.log(coverImage)

        // const {data: uploadResponse, error: uploadError} = 
        // await wallet?.minter?.uploadField(MetadataField.Media, coverImage)
        // if(uploadError) {
        //     console.error(uploadError)
        // }

        wallet?.minter?.setMetadata({
            title: data.Name,
            description: 'SBIC Ticket',
            media: coverImage,
        })

        console.log(wallet.minter?.currentMint)
        wallet.mint(1,"spartantest.mintspace2.testnet",undefined,undefined)
    }

    
    console.log(isConnected)
    return (<div className="w-full">
        <form className="bg-white rounded px-5 " onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name
                </label>
                <input 
                {...register('name',{required: true})}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                id="inline-full-name" 
                type="text" 
                placeholder="Name">

                </input>
            </div>
            <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Description
                </label>
                <input 
                {...register('description',{required: true})}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                id="inline-full-name" 
                type="text" 
                placeholder="description">

                </input>
            </div>
            <div className='mb-4'>
            <label className="block text-gray-700 text-sm font-bold mb-2">
                    Ticket
                </label>
            </div>
            <input className='bg-black rounded w-full text-white p-2 cursor-pointer' type='submit' value="Mint Ticket "></input>
        </form>
        
    </div>
    )
}

export default Form


