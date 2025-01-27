const Error: React.FC<{ error: string }> = ({ error }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <p className="text-red-500">{error}</p>
      </div>
    </div>
  )
}

export default Error;