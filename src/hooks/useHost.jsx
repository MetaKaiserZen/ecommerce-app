const useHost = () =>
{
    const appEnv = process.env.EXPO_PUBLIC_APP_ENV;

    const apiHost = process.env.EXPO_PUBLIC_API_HOST;
    const apiPort = process.env.EXPO_PUBLIC_API_PORT;

    const deployHost = process.env.EXPO_PUBLIC_DEPLOY_HOST;

    const myPromise = () =>
    {
        return new Promise((resolve) =>
        {
            const host = appEnv === 'local' ? (`${apiHost}:${apiPort}`) : deployHost;

            resolve({ host: host });
        });
    }

    return myPromise;
}

export default useHost;
