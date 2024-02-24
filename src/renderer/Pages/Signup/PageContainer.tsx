import { motion } from 'framer-motion';
import { ComponentProps } from 'react';
import { SIGNUP_ANIMATION_OBJS } from '../../../objs';
import { PageContainerProps } from '../../../types';

const PageContainer: React.FC<PageContainerProps> = (props) => {
  return (
    <>
      {props.page == 1 ? (
        <motion.div
          exit={
            props.direction == 'left'
              ? SIGNUP_ANIMATION_OBJS.exitLeft
              : SIGNUP_ANIMATION_OBJS.exitRight
          }
          onLoad={() => {
            if (props.componentLoaded) props.componentLoaded();
          }}
          initial={
            props?.initialState == 0
              ? { scale: 0, opacity: 0 }
              : props.direction == 'left'
              ? SIGNUP_ANIMATION_OBJS.initialLeft
              : SIGNUP_ANIMATION_OBJS.initialRight
          }
          animate={SIGNUP_ANIMATION_OBJS.animate}
          className="Page"
        >
          {props.children}
        </motion.div>
      ) : (
        <motion.div
          initial={
            props.direction == 'left'
              ? SIGNUP_ANIMATION_OBJS.initialLeft
              : SIGNUP_ANIMATION_OBJS.initialRight
          }
          animate={SIGNUP_ANIMATION_OBJS.animate}
          exit={
            props.direction == 'left'
              ? SIGNUP_ANIMATION_OBJS.exitLeft
              : SIGNUP_ANIMATION_OBJS.exitRight
          }
          className="Page"
        >
          {props.children}
        </motion.div>
      )}
    </>
  );
};

export default PageContainer;
