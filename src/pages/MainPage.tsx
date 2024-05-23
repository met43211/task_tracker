import { useNavigate } from "react-router-dom";
import { getFromLocalStorage } from "../helpers/localStorageHelpers";
import { useEffect } from "react";
import CreateBar from "../components/CreateBar/CreateBar";
import Wrapper from "../components/Container/Wrapper";
import Section from "../components/Container/Section";
import { useAppSelector } from "../hooks/redux";
import TasksContainer from "../components/TasksContainer/TasksContainer";
import Footer from "../components/Footer/Footer";
import TasksList from "../components/Tasks/TasksList";
import Modal from "../UI/Modal/Modal";
import { setModal } from "../store/slices/tasksSlice";
import { useDispatch } from "react-redux";
import { checkIsTasksStillToday } from "../helpers/isTasksStillToday";

function MainPage() {
  const {
    passedTasks,
    showMore,
    todayTasks,
    currentTasks,
    modalComponent,
    modal,
  } = useAppSelector((state) => state.tasksReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!getFromLocalStorage("isAuth")) {
      navigate("/task_tracker/auth");
    }
  }, [navigate]);

  useEffect(() => {
    checkIsTasksStillToday(todayTasks, currentTasks, dispatch);
  }, []);

  return (
    <>
      <Wrapper>
        <Section>
          <CreateBar />
          {currentTasks.length > 0 && <TasksList tasks={currentTasks} />}
        </Section>
        <Section>
          <TasksContainer tasks={todayTasks}>
            <TasksList tasks={todayTasks} />
          </TasksContainer>
        </Section>
        {showMore &&
          passedTasks.slice(0, 3).map((day) => (
            <Section>
              <TasksContainer
                tasks={day.tasks}
                date={new Date(day.date)}
                key={day.date}
              >
                <TasksList tasks={day.tasks} />
              </TasksContainer>
            </Section>
          ))}
        <Section>
          <Footer />
        </Section>
      </Wrapper>
      <Modal
        close={() => dispatch(setModal(false))}
        modal={modal}
        isMassage={true}
      >
        {modalComponent}
      </Modal>
    </>
  );
}

export default MainPage;
