export type TriggerConfig =
  | {
      // Type of trigger, either cast or composer. Required.
      type: 'cast';

      // Unique ID. Required. Reported to the frame.
      // Example: "yoink-score"
      id: string;

      // Handler URL. Required.
      // Example: "https://yoink.party/triggers/cast"
      url: string;

      // Name override. Optional, defaults to FrameConfig.name
      // Example: "View Yoink Score"
      name?: string;
    }
  | {
      type: 'composer';
      id: string;
      url: string;
      name?: string;
    };