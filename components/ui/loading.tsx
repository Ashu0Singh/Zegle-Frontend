export default function Loading({ message }: { message: string }) {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
                <div className="h-8 w-8 animate-spin text-gray-500 dark:text-gray-400" />
                <p className="text-gray-500 dark:text-gray-400">
                    {message ? message : "Loading..."}
                </p>
            </div>
        </div>
    );
}
