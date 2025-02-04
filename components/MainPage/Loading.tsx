const Loading: React.FC<{}> = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <p>Loading...</p>
      </div>
    </div>
  )
}

export default Loading;