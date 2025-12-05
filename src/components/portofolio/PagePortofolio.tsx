import { portfolioFetch } from '@/app/actions/fetchAction'
import PortofolioList from '../portogfolioList'

const PagePortofolio = async () => {
  const { result, error } = await portfolioFetch()

  return <PortofolioList initialData={result} />
}

export default PagePortofolio
