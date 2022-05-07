import React, { FC, useState, useEffect } from "react";
import Stepper from "components/checkpoint/screens/stages-stepper/Stepper";
import { CheckpointStyled } from "./check_point.styles";
import { ExpoStatus } from "types";
import { StepList, UseExpoStage } from "types/stepper-type/stepper.types";

import { ExpoActivityList, IExpoActivitiesSettings } from "types";

const defaultSteps: StepList = [
  {
    name: ExpoStatus.PrevioCargue,
    progress: 0,
  },
  {
    name: ExpoStatus.TransitoPuerto,
    progress: 0,
  },
  {
    name: ExpoStatus.EnPuerto,
    progress: 0,
  },
  {
    name: ExpoStatus.TransitoInternacional,
    progress: 0,
  },
  {
    name: ExpoStatus.EnDestino,
    progress: 0,
  },
];

export const getProgress = (list: ExpoActivityList): StepList => {
  const steps = [...defaultSteps];
  const stageActivityCounter = list.reduce(
    (
      accum: { [key: string]: { total: number; completed: number } },
      activity: IExpoActivitiesSettings
    ) => {
      if (accum[activity.status]) {
        accum[activity.status] = {
          total: accum[activity.status].total + 1,
          completed:
            activity.progress === "Completado"
              ? accum[activity.status].completed + 1
              : accum[activity.status].completed,
        };
      } else {
        accum[activity.status] = {
          total: 1,
          completed: activity.progress === "Completado" ? 1 : 0,
        };
      }

      return accum;
    },
    {}
  );
  // console.log("stageActivityCounter: ", stageActivityCounter);
  Object.keys(stageActivityCounter).forEach((stageName) => {
    const { total, completed } = stageActivityCounter[stageName];
    const stage = steps.find((step) => step.name === stageName);
    const progress = Math.ceil((completed / (total || 1)) * 100);
    if (stage) {
      stage.progress = progress;
    }
    // debugger;
  });
  // console.log("steps: ", steps);

  return steps;
};

export const useExpoStage = (list: ExpoActivityList) => {
  const [state, setState] = useState<UseExpoStage>({
    stages: [],
    currentExpoStage: ExpoStatus.PrevioCargue,
  });

  useEffect(() => {
    if (list?.length) {
      const stages = getProgress(list);
      const currentExpoStage =
        stages.find((stage) => stage.progress !== 100)?.name ??
        ExpoStatus.PrevioCargue;
      setState({ stages, currentExpoStage });
    }
  }, [list]);

  return state;
};

const getGlobalProgress = (stages: StepList) => {
  const count = stages.reduce((accum, stage) => {
    return accum + stage.progress;
  }, 0);
  return Math.ceil((count / 500) * 100);
};

export const getStagesProgress = (list: ExpoActivityList) => {
  const stages = getProgress(list);
  const currentExpoStage: ExpoStatus =
    (stages.find((stage) => stage.progress !== 100)?.name as ExpoStatus) ??
    ExpoStatus.PrevioCargue;

  const globalProgress = getGlobalProgress(stages);
  return {
    globalProgress,
    currentExpoStage,
  };
};

interface CheckPointProps {
  steps: StepList;
  currentExpoStage: ExpoStatus | string;
  expoStageSelected: ExpoStatus | string;
  onStageFilter: (name: string) => void;
}

const CheckPoint: FC<CheckPointProps> = ({
  steps,
  onStageFilter,
  currentExpoStage,
  expoStageSelected,
}) => {
  return (
    <CheckpointStyled>
      <Stepper
        steps={steps}
        height={2}
        onStepClick={onStageFilter}
        activeStep={currentExpoStage}
        selectedStep={expoStageSelected}
      />
    </CheckpointStyled>
  );
};

export default CheckPoint;
