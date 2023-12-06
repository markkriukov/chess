import { FC } from 'react'
import { Figure } from '../classes/figures/Figure'

interface LostFiguresProps {
  title: string
  figures: Figure[]
}

const LostFigures: FC<LostFiguresProps> = ({ title, figures }) => {
  return (
    <div className="lost">
      <h3>{title}</h3>
      <div className='list'>
        {figures.map(figure =>
          <div key={figure.id}>
            {figure.logo && <img width={20} height={20} src={figure.logo} alt='' />}
          </div>
        )}
      </div>
    </div>
  )
}


export default LostFigures;