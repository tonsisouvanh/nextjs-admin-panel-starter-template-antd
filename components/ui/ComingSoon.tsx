import React from "react";
import Image from "next/image";
const ComingSoon = () => {
  return (
    <div className="w-fit mx-auto">
      <Image
        priority
        height={500}
        width={500}
        quality={70}
        src={"/assets/images/undercon.png"}
        alt="Under Development"
      />
    </div>
  );
};

export default ComingSoon;
