/*
  Project Name: Bun Preact
  License: MIT
  Created By: Lightnet

  browser client
*/

/** @jsx h */
import { h } from "preact"
import { 
  useState, 
  useEffect, 
  useContext 
} from "preact/hooks"
import DisplayUser from "../auth/DisplayUser.jsx"

export default function Account(){
  const [isShowId, setIsShowId] = useState(false);

  return (<div>
    <div>
      <label>Alias: </label><DisplayUser/>
    </div>
    <div>

    </div>
  </div>)
}