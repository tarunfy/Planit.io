import { Player } from "@lottiefiles/react-lottie-player";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

const BookingSuccessfull = () => {
  const { width, height } = useWindowSize();
  return (
    <>
      <div className="flex items-center bg-slate-50 flex-col justify-center h-screen space-y-4">
        <Player
          autoplay
          keepLastFrame
          src="https://assets2.lottiefiles.com/packages/lf20_atippmse.json"
          style={{ height: "200px", width: "200px" }}
        ></Player>
        <h4 className="font-Outfit text-3xl text-center">
          Your meeting has been booked successfully.
        </h4>
      </div>
      <Confetti
        recycle={false}
        tweenDuration={10000}
        numberOfPieces={400}
        width={width}
        height={height}
      />
    </>
  );
};

export default BookingSuccessfull;
