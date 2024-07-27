export interface T_FRAME_API_BODY {
    untrustedData: {
      fid: number
      url: string
      messageHash: string
      timestamp: number
      network: string
      buttonIndex: number
      inputText: string
      transactionId: string
      state: string
      address: string
      castId: {
        fid: number
        hash: string
      }
    }
    trustedData: {
      messageBytes: string
    }
  }