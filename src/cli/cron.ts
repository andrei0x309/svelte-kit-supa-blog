import { getGoodReadsData, getTagCloud  } from '$lib/utils/server/widgets'

const executeCron = async () => {
    const tasks = await Promise.all([getGoodReadsData(), getTagCloud()])
    let index = 0
    const taskNames = ['getGoodReadsData', 'getTagCloud']
    for (const task of tasks) {
        console.log(`Task ${taskNames[index]} executed: \n`, task)
        index++
    }
}

executeCron()