import { formatDistanceToNow, parseISO} from "date-fns";


const PostsTime = ({ timestamp }) => {

    let posttime = ''
    if(timestamp){
        const date = parseISO(timestamp)
        const timePeriod = formatDistanceToNow(date)
        posttime = `posted ${timePeriod} ago`
    }
  return(
   <span title="{timestamp}">
    &nbsp; <i>{posttime}</i>
   </span>
  )
}

export default PostsTime