export type OptionalChain<T = Record<string, any>> = T & {
    if (condition: boolean, thanF: (chain: T) => T, elseF?: (chain: T) => T): T
    chain (f: (chain: T) => T): T
    end (): T
};

export const optionalChain = (chain: unknown): OptionalChain<any> => {
    return {
      if (condition: boolean, thanF: any, elseF: any) {
        return optionalChain(condition? thanF(chain) : (
          elseF? elseF(chain) : chain
        ))
      },
      chain (f: any) {
        return optionalChain(f(chain))
      },
      end () {
        return chain
      }
    }
  }
