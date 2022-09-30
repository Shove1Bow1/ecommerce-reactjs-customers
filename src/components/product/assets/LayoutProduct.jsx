const LayoutProduct = (props) => {
    console.log(props);
    const { title, price, imgUrl } = props;
    console.log(price);
    return (
        <div className="flex flex-col items-start p-[16px] gap-[16px] w-[268px] h-[332px] border-[#D1D1D1] border-[1px] rounded-[12px] bg-white">
            <img className="left-[0px] right-[0px] top-[0px] bottom-[0px] bg-[#F9F9F9] rounded-[12px] w-[236px] h-[180px]" title={title} alt="img" src="https://linhkienlammusic.com/thumbs/540x540x1/upload/product/khuon-lam-banh-xep-nhua-7968.jpg" />
            <div className="flex flex-col items-start w-[236px] h-[184px] padding-[0px] self-stretch">
                <p className="w-[251px] h-[49px] font-[500] text-[15px] text-[#151515]">{title}</p>
                <div className="w-[237px] h-[36px] relative self-stretch flex">
                    <p className="w-[100px] h-[27px] left-[0px] bot-[4px] font-[600] text-[18px] text-[#151515] absolute">{price} vnđ</p>
                    <button style={{ top: 'calc(50%-36px/2+0.5px)' }} className="bg-[#6A983C] border-[#46760A] border-[2px] rounded-[12px] flex flew-row items-center w-[90px] h-[36px] right-[0px] p-[12px] absolute">Buy now</button>
                </div>
            </div>
        </div>
    )
}
export default LayoutProduct;