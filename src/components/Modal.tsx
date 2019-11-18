import * as React from 'react';
import StartIcon from '../assets/icons/start.png';
import FinishIcon from '../assets/icons/finish.png';
import Wall from '../assets/icons/wall.png';
import Weight from '../assets/icons/weight.png';

interface State {
  isOpen: boolean;
}
interface Props {}
//must pass in all the props
class Modal extends React.Component<Props, State> {
  state: State = {
    isOpen: true,
  };
  constructor(props: Props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }
  public closeModal() {
    this.setState({ isOpen: false });
  }
  public openModal() {
    this.setState({ isOpen: true });
  }
  render() {
    return this.state.isOpen ? (
      <div className="modal-wrapper">
        <div className="modal-inner">
          <div className="column modal">
            <h1>Welcome to Pathfinding Vizualizer!</h1>
            <h3>
              This app allows you to visualize the shortest path <br />
              between two nodes using different types of pathfinding algorithms
            </h3>
            <h2>Instructions</h2>
            <div className="icon-row">
              <img className="icon" src={StartIcon} />
              <p className="modal-text">Choose your start node</p>
            </div>

            <div className="icon-row">
              <img className="icon" src={FinishIcon} />
              <p className="modal-text">Choose your end node</p>
            </div>
            <div className="icon-row">
              <img className="icon" src={Wall} />
              <p className="modal-text">Add walls that cannot be trespassed</p>
            </div>
            <div className="icon-row">
              <img className="icon" src={Weight} />
              <p className="modal-text">
                Add weights that will add a cost <br />
                (for weighted algorithms)
              </p>
            </div>

            <h2>Select An Algorithm</h2>
            <div className="icon-row">
              <p className="modal-text">
                <b>Breadth First Search:</b>
                <br />
                Unweighted algorithm that gaurantees the shortest path
              </p>
            </div>

            <div className="icon-row">
              <p className="modal-text">
                <b>Dijkstra's: </b>
                <br />
                Weighted algorithm that gaurantees the shortest path
              </p>
            </div>

            <div className="icon-row">
              <button
                className="modal-btn"
                id="rainbow"
                onClick={this.closeModal}
              >
                Let's get started
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}

export default Modal;
