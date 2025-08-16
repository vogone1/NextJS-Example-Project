import React, { FC } from 'react';
import './MouseLoading.scss';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface MouseLoadingProps { }

const MouseLoading: FC<MouseLoadingProps> = () => (
  <div className="MouseLoading" data-testid="MouseLoading">
    <DotLottieReact
      src="https://lottie.host/1cf88e99-4f90-4a8a-a59d-d8b0efeb5755/JwLekCYaFR.lottie"
      loop
      autoplay
      speed={1.25}
    />
  </div>
);

export default MouseLoading;
