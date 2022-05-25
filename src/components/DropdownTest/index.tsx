// import { MouseEvent, useRef, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import cx from 'classnames'

// import { ArrowDown } from 'assets/svgs'

// import styles from './dropdownTest.module.scss'
// import { changeSelectedOption } from 'store/adSlice'
// import { IAds } from 'types/ads'

// const DropDownTest = () => {
//   const [showOption, setShowOption] = useState(false)
//   const optionRef = useRef<HTMLUListElement>(null)
//   const { selectedOption } = useSelector((state: IAds) => state.adOption)
//   const dispatch = useDispatch()

//   const handleChangeOption = () => setShowOption((prevOption) => !prevOption)

//   const handleChangeSelecteOption = (e: MouseEvent<HTMLButtonElement>) => {
//     dispatch(changeSelectedOption(e.currentTarget.value))
//     handleChangeOption()
//   }

//   const textOption = [
//     {
//       all: '전체 광고',
//     },
//     { active: '진행중' },
//     { ended: '중단됨' },
//   ][selectedOption]

//   return (
//     <div>
//       <button
//         type='button'
//         onClick={handleChangeOption}
//         className={cx(styles.adListButton, { [styles.open]: showOption })}
//       >
//         {textOption[0]}
//         <ArrowDown />
//       </button>
//       <ul ref={optionRef} className={cx(styles.options, { [styles.open]: showOption })}>
//         {textOption.map((list: object, index: number) => (
//           <li key={list[index]}>
//             <button type='button' value={list.value} onClick={handleChangeSelecteOption}>
//               {list[index]}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default DropDownTest

export default {}
