import { Link } from 'react-router-dom'

import { useAppSelector } from '../redux/hook'
export const Home=()=>{
 const auth=useAppSelector(state=>state.User.Auth)
    return (
        <div className="tw-w-full tw-h-screen tw-flex tw-justify-center tw-bg-slate-100 tw-text-center tw-items-center">
            <div className='md:tw-w-4/12 sm:tw-w-6/12 tw-rounded-md tw-border-2 tw-border-slate-800 tw-p-4'>
                <h1 className="tw-font-ptserif tw-text-4xl ">Image App Gallary</h1>
                <p className='tw-mt-3 tw-font-thin'>Simple Gallery brings you all the photo viewing and editing features you have been missing on your Android in one stylish easy-to-use app. Browse, manage, crop and edit photos or videos faster than ever, recover accidentally deleted files or create hidden galleries for your most precious images and videos. And with advanced file-support and full customization, finally, your gallery works just the way you want</p>
                <div className='tw-flex tw-justify-between tw-mt-4'>
                    {
                        !auth?<>
                        <Link to={'/signup'} className='tw-bg-blue-600 tw-p-3 tw-rounded-lg'>SignUp</Link>
                        <Link to={'/login'} className='tw-bg-blue-600 tw-p-3 tw-rounded-lg'>LogIn</Link>
                        
                        </>:<>
                        
                        <Link to={'/allimages'} className='tw-bg-blue-600 tw-p-3 tw-rounded-lg'>AllImages</Link>
                        <Link to={'/myimages'} className='tw-bg-blue-600 tw-p-3 tw-rounded-lg'>MyImages</Link>
                        </>

                    }
                </div>
            </div>
        </div>
    )
}