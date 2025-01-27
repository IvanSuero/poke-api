import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'

const User: React.FC<{userScore: number, cpuScore: number}> = ({ userScore, cpuScore }) => {
  return (
    <div className="h-screen flex flex-col justify-between">

      {/* CPU points */}
      <div className="p-4 rounded-lg items-start flex gap-4 pt-8">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="CPU" />
          <AvatarFallback>CPU</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg font-bold flex">CPU</p>
          <p className="text-2xl font-bold text-center">{ cpuScore }</p>
        </div>
      </div>

      {/* User points */}
      <div className="p-4 rounded-lg items-end flex gap-4 pb-8">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-2xl font-bold text-center">{ userScore }</p>
          <p className="text-lg font-bold flex">User</p>
        </div>
      </div>
    </div>
  )
}

export default User;