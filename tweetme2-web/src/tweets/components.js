import React, {useEffect, useState} from 'react';  
import { LoadTweets } from '../lookup';

export function TweetComponents(props){
    const textAreaRef = React.createRef();
    const [newTweets, setNewTweets] = useState([]);
    const handleSubmit = (event) => {
        event.preventDefault();
        const newVal = textAreaRef.current.value;
        let tempNewTweets=[...newTweets];
        tempNewTweets.unshift({
            content: newVal,
            likes : 0,
            id : 1234
        });
        setNewTweets(tempNewTweets);
        textAreaRef.current.value = '';

    }
    return <div className={props.className}>
        <div className='col-12 mb-3'>
        <form onSubmit = {handleSubmit}>
        <textarea ref={textAreaRef} required = {true} className = "form-control" name = 'tweet'>

        </textarea>
        <button type = 'submit' className="btn btn-primary">Tweet</button>
    </form>
    </div>
    <TweetList newTweets ={newTweets}/>
    </div>
}

export function TweetList(props) {
    const [tweetsInit, setTweetsInit] = useState([]);
    const [tweets, setTweets] = useState([]);
    useEffect(() => {
        const final = [...props.newTweets].concat(tweetsInit);
        if (final.length !==tweets.length){
            setTweets(final);
        }
        
    }, [props.newTweets, tweets, tweetsInit]);
    useEffect(() => {
      const myCallBack = (response, status) =>{
        
        if (status === 200) {
            setTweetsInit(response);
        } else {
          alert("Error loading tweets")
        }
  
      }
  
      LoadTweets(myCallBack)
      
    }, [tweetsInit]);
    return tweets.map((item, index)=>{
      return <Tweet tweet={item}  key = {`${index} -{item.id}`} className='my-5 py-5 bg-white text-dark'/>
  })
  }

export function ActionBtn(props){
    const{tweet, action} = props
    const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0)
    const [userLike, setUserLike] = useState(tweet.userLike===true ? true :false)
    const className = props.className ? props.className :'btn  btn-primary btn-sm'
    const actionDisplay = action.display ? action.display : "Action"
    
    const handleClick= (event) => {
        event.preventDefault();
        if (action.type ==='like') {
            if (userLike === true){
                setLikes(likes - 1)
                setUserLike(false)
            } else {
                setUserLike(true)
                setLikes(likes + 1)
            }
            
        }
    }
    const display = action.type ==='like' ? `${likes} ${actionDisplay }` : actionDisplay
    return <button  className= {className} onClick={handleClick}>{display}</button>  
  }
  
export function Tweet(props) {
    const {tweet} = props;
    const className = props.className ? props.className : "col-10 mx-auto col-md-6";
    return (
      <div className= {className}>
        <p>{tweet.id} - {tweet.content}</p>
        <div className='btn btn-group'>
          <ActionBtn  tweet={tweet} action={{type:"like", display:"Likes"}}/>
          <ActionBtn  tweet={tweet} action={{type:"unlike", display:"Unlike"}}/>
          <ActionBtn  tweet={tweet} action={{type:"retweet", display:"Retweet"}}/>
  
        </div>
      </div>
    )
  }