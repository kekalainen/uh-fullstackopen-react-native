import { StyleSheet, View } from 'react-native';
import { Navigate, Route, Routes } from 'react-router-native';

import AppBar from './AppBar';
import CreateReview from './CreateReview';
import Repository from './Repository';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import SignOut from './SignOut';
import SignUp from './SignUp';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.primaryLightest,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />}></Route>
        <Route path="/reviews/create" element={<CreateReview />}></Route>
        <Route path="/repositories/:id" element={<Repository />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signout" element={<SignOut />}></Route>
        <Route path="/" element={<Navigate to="/" replace />}></Route>
      </Routes>
    </View>
  );
};

export default Main;
