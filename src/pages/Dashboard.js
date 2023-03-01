import Sheet from '../components/common/Sheet'

function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-9 gap-6 text-white">
      <section className="lg:col-span-6">
        <Sheet className="group p-4 sm:p-6 bg-amber-900/30">
          <div className='h-96'>
            primary content
          </div>
        </Sheet>
      </section>

      <section className="lg:col-span-3">
        <Sheet className="group p-4 sm:p-6 bg-amber-900/30">
          <div className='h-80'>
            secondary content
          </div>
        </Sheet>
      </section>
    </div>
  )
}
export default Dashboard
