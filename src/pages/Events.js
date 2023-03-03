/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react"
import { Helmet } from "react-helmet"

function Events() {
  const [openModel, setOpenModel] = useState(false);

  return (
    <>
      <Helmet>
        <title>Moksha | Events</title>
      </Helmet>

      <div className=" mt-[80px] ">
        <div className="flex justify-center mx-[2px] items-center sm:mx-auto">
          <img
            src="https://imgs.search.brave.com/DJ2IC7NS4xuxojmtlESdT_nIeSKmidXy71mIAyKayUY/rs:fit:1200:857:1/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDI0ODMz/MjkuanBn"
            className="box-border cursor-pointer object-fill w-[889px] h-[250px] sm:h-[400px] left-0 border-solid border-1 border-black bg-prime-yell"
          />
          <img
            onClick={() => setOpenModel(true)}
            src="https://imgs.search.brave.com/TeotcDDseRu34FVtwZ4OolqkT9VG1a7_3ilEJEWuw-w/rs:fit:1200:1200:1/g:ce/aHR0cDovL2QyOGhn/cHJpOGFtMmlmLmNs/b3VkZnJvbnQubmV0/L2Jvb2tfaW1hZ2Vz/L29uaXgvY3ZyOTc4/MTYwODg3Mzk2OC9t/YXJ2ZWwtY29taWNz/LTk3ODE2MDg4NzM5/NjhfaHIuanBn"
            className="ml-4 cursor-pointer box-border object-contain w-[551px] h-[250px] sm:h-[400px] bg-sec-yell left-[889px] border-solid border-1 border-black"
          />
        </div>
        <div className="flex mt-1 justify-center mx-[2px] items-center">
          <img
            src="https://imgs.search.brave.com/TeotcDDseRu34FVtwZ4OolqkT9VG1a7_3ilEJEWuw-w/rs:fit:1200:1200:1/g:ce/aHR0cDovL2QyOGhn/cHJpOGFtMmlmLmNs/b3VkZnJvbnQubmV0/L2Jvb2tfaW1hZ2Vz/L29uaXgvY3ZyOTc4/MTYwODg3Mzk2OC9t/YXJ2ZWwtY29taWNz/LTk3ODE2MDg4NzM5/NjhfaHIuanBn"
            className="box-border cursor-pointer sm:w-[551px] w-[400px] object-contain h-[250px] sm:h-[400px] bg-sec-yell left-[889px] border-solid border-1 border-black"
          />
          <img
            src="https://imgs.search.brave.com/DJ2IC7NS4xuxojmtlESdT_nIeSKmidXy71mIAyKayUY/rs:fit:1200:857:1/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDI0ODMz/MjkuanBn"
            className="box-border cursor-pointer w-[889px] object-fill h-[250px] sm:h-[400px] left-0 border-solid border-1 border-black bg-prime-yell"
          />
        </div>
      </div>
    </>
  );
}

export default Events;
