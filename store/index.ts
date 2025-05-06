import { create } from 'zustand';

import { DIRECTION, ROBOT_CURRENT_MODE, ROBOT_WORK_MODE } from '@/types';

interface State {
  canLoginInfo: {
    company: string;
    id: number;
    name: string;
    number: string;
    password: string;
    position: string;
  };
  setCanLoginInfo: (newInfo: { [key: string]: any }) => void;
  robotStatus: {
    robotDangerStatus: boolean;
    direction: Map<DIRECTION, boolean>;
    currentMode: ROBOT_CURRENT_MODE;
    currentBindingMode: ROBOT_WORK_MODE;
    isWorking: boolean;
    skip_binding_count: number;
  };
  setRobotStatus: (newInfo: { [key: string]: any }) => void;
  userInfo: {
    username: string;
    password: string;
  };
  setUserInfo: (newInfo: { [key: string]: any }) => void;
  workParams: {
    track_laser_range: string;
    node_laser_range: string;
    upper_layer_diameter: string;
    lower_layer_diameter: string;
    lower_steel_bar_length: string;
    binding_timeout: string;
    ultrasonic_waves: boolean;
    prevent_falling_laser: boolean;
    auto_find_point: boolean;
  };
  setWorkParams: (newInfo: { [key: string]: any }) => void;
}

export const useStore = create<State>((set) => ({
  robotStatus: {
    robotDangerStatus: false,
    direction: new Map([
      [DIRECTION.UP, false],
      [DIRECTION.DOWN, false],
      [DIRECTION.LEFT, false],
      [DIRECTION.RIGHT, false],
    ]),
    currentMode: ROBOT_CURRENT_MODE.LOCKED,
    currentBindingMode: ROBOT_WORK_MODE.WITHOUT_BINDING,
    isWorking: false,
    skip_binding_count: 1,
  },
  canLoginInfo: {
    company: 'HKCRC',
    id: 0,
    name: 'admin',
    number: '85223563130',
    password: 'hkcrc',
    position: 'HongKong',
  },
  setCanLoginInfo: (newInfo: { [key: string]: any }) =>
    set((state) => ({ canLoginInfo: { ...state.canLoginInfo, ...newInfo } })),
  setRobotStatus: (newInfo: { [key: string]: any }) =>
    set((state) => ({
      robotStatus: {
        ...state.robotStatus,
        ...newInfo,
      },
    })),
  userInfo: {
    username: '',
    password: '',
  },
  setUserInfo: (newInfo: { [key: string]: any }) =>
    set((state) => ({ userInfo: { ...state.userInfo, ...newInfo } })),
  workParams: {
    track_laser_range: '100',
    node_laser_range: '100',
    upper_layer_diameter: '100',
    lower_layer_diameter: '100',
    lower_steel_bar_length: '100',
    binding_timeout: '100',
    ultrasonic_waves: false,
    prevent_falling_laser: false,
    auto_find_point: false,
  },
  setWorkParams: (newInfo: { [key: string]: any }) =>
    set((state) => ({
      workParams: {
        ...state.workParams,
        ...newInfo,
      },
    })),
}));

export default useStore;
