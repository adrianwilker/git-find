import './styles.css'

const ItemList = ({title, description, url}) => {
  return (
    <div className="item-list">
      <strong><a href={url} target="_blank">{title}</a></strong>
      <p>{description}</p>
      <hr />
    </div>
  )
}

export { ItemList }