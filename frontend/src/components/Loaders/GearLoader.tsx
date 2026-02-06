import Lottie from "lottie-react";
import animationData from "../../assets/gear-original.json";

const GearLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center  z-50">
      <main className="relative min-h-screen flex flex-col justify-between tavern-bg">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        <div className="relative z-10 flex flex-1 items-center justify-center px-4">
          <div className="w-[40vw] max-w-[220px] sm:max-w-[260px] md:max-w-[300px]">
            <Lottie animationData={animationData} loop />
            {/* <img src="/images/spinner.gif" alt="no-spinner" /> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GearLoader;
<div>
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum, animi sapiente.
  Perferendis obcaecati nisi, culpa blanditiis assumenda fugit sint voluptatum
  eligendi sed molestiae consequuntur nihil cumque beatae, molestias atque
  saepe.
</div>;
