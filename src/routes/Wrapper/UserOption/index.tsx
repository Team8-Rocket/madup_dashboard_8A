import { Alert, Profile, Setting } from '../../../assets/svgs'
import styles from './userOption.module.scss'

const UserOption = () => {
  return (
    <div className={styles.userOptionWrapper}>
      <div className={styles.userOption}>
        <div className={styles.alert}>
          <Alert />
          <div className={styles.circle} />
        </div>
        <Setting />
        <div className={styles.userProfile}>
          <Profile />
          <span>원티드 님</span>
        </div>
      </div>
    </div>
  )
}

export default UserOption
