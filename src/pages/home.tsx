import HomeImg from '../assests/cloud-computing-feature-1050-450-1000x450.jpg'
export const Home=()=>{

    return (
        <div className="tw-w-full tw-h-screen tw-flex tw-justify-center tw-items-center">
            <div className='tw-w-2/6'>
            <img src={HomeImg} alt='Home' className='tw-w-full' ></img>
            </div>
            <div className='tw-w-2/6 tw-border-4 tw-p-3'>
                <h1 className="tw-font-ptserif tw-text-4xl ">Image App Gallary</h1>
                <p className='tw-absolute '></p>
            </div>
        </div>
    )
}