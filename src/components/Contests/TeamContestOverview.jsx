import { useParams } from "react-router-dom"
import Sheet from "../common/Sheet"
import ContestTypeBadge from "./ContestTypeBadge"
import { getContestData } from "../../data/contests"

export default function TeamContestOverview() {
  const params = useParams()
  const contest = getContestData(params.club, params.contest)

  return (
    <>
      <Sheet className="p-4 sm:p-6">
        <article className='markdown'>
          <h1>{ contest.name }</h1>

          <div className="flex gap-2">
            { contest.type.map(type => <ContestTypeBadge type={type} />) }
          </div>

          { contest.description.map((para, i) => <Para key={i} para={para} />) }
        </article>
      </Sheet>

      {
        contest.instructions && (
          <Sheet className="mt-4 sm:mt-6 p-4 sm:p-6">
            <article className='markdown'>
              <h2>Instructions</h2>

              { contest.instructions.map((para, i) => <Para key={i} para={para} />) }
            </article>
          </Sheet>
        )
      }
    </>
  )
}

const Para = ({ para }) => {
  return (
    <>
      { para.heading && <h3>{para.heading}</h3> }
      { para.p && <p className={para.bold ? 'font-semibold' : ''}>{para.p}</p> }
      { para.ul && (
        <ul>
          { para.ul.map((li, i) => <li key={i}>{ li }</li>) }
        </ul>
      )}
    </>
  )
}
