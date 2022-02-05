import { useEffect, useState } from 'react'
import { StyleSheet, TextInput, Text, TouchableOpacity, View } from 'react-native';
import TablePagination from '@mui/material/TablePagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import './App.css';

function App() {
  const emptyBookmark = {
    id: 0,
    URL: '',
    title: '',
    author: '',
    width: '',
    height: '',
    duration: '',
    keyWord: '',
    createdAt: '',
    updatedAt: ''
  }

  const updateBookmark = {
    id: 0,
    keyWord: ''
  }

  const [modifyBookmark, setModifyBookmark] = useState(false)
  const [url, setUrl] = useState("");
  const [keyWord, setKeyWord] = useState('');
  const [searchKeyWord, setSearchKeyWord] = useState('')
  const [updateKeyWord, setUpdateKeyWord] = useState(updateBookmark);
  const [movieNumber, setMovieNumber] = useState(0);
  const [page, setPage] = useState(0)
  const [movies, setMovie] = useState([emptyBookmark])
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const createBookmark = async function () {
    const keyWordSplit = updateKeyWord.keyWord.split(',')
    await axios.post(`http://localhost:3000/bookmark`, {
      url: url,
      keyWord: keyWordSplit
    })
    getBookmark()
  }

  useEffect(() => {
    getBookmark()
  }, [page]);

  const getBookmark = async function () {
    const querySearchKeyWord = !!searchKeyWord ? `&keyWord=${searchKeyWord}` : ''
    const query = `?order=ASC&limit=${rowsPerPage}&offset=${rowsPerPage * page}${querySearchKeyWord}`
    const bookmark = await axios.get(`http://localhost:3000/bookmark${query}`)
    setMovieNumber(bookmark.data.count)
    setMovie(bookmark.data.rows)
  }
  const handleChangeRowsPerPage = async function (event: any) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  const handleClick = async function (event: any, id: number) {
    const bookmark = movies.find((bookmark) => bookmark.id === id) as typeof emptyBookmark
    setUpdateKeyWord({ id: bookmark.id, keyWord: bookmark.keyWord })
    setModifyBookmark(true)
  }

  const updateBookmarkFunction = async function () {
    const keyWordSplit = updateKeyWord.keyWord.split(',')
    await axios.put(`http://localhost:3000/bookmark/${updateKeyWord.id}`, {
      keyWord: keyWordSplit
    })
    setModifyBookmark(false)
    getBookmark()
  }
  const DeleteBookmarkFunction = async function () {
    await axios.delete(`http://localhost:3000/bookmark/${updateKeyWord.id}`)
    setModifyBookmark(false)
    getBookmark()
  }
  const handleChangePage = function (event: any, page: number) {
    setPage(page)
  }

  const update = function () {
    if (modifyBookmark)
      return (
        <View style={styles.content} >
          <Text>id : {updateKeyWord.id}    </Text>
          <Text>Mots clés à modifier :</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setUpdateKeyWord({ id: updateKeyWord.id, keyWord: text })}
            value={updateKeyWord.keyWord}
            placeholder="exemple,mots,clés"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={updateBookmarkFunction}
          >
            <Text>Mettre à jour</Text>
          </TouchableOpacity>
          <Text>    </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={DeleteBookmarkFunction}
          >
            <Text>Supprimer</Text>
          </TouchableOpacity>
        </View>
      )
  }
  return (
    <View>

      <View style={styles.content} >
        <Text>URL :</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setUrl(text)}
          value={url}
          placeholder="https://vimeo.com/66386720"
        />
        <Text>Mots clés :</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setKeyWord(text)}
          value={keyWord}
          placeholder="exemple,mots,clés"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={createBookmark}
        >
          <Text>Crée</Text>
        </TouchableOpacity>
      </View >

      <View style={styles.content} >
        <Text>Mots clés :</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setSearchKeyWord(text)}
          value={searchKeyWord}
          placeholder="exemple,mots,clés"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={getBookmark}
        >
          <Text>Rechercher</Text>
        </TouchableOpacity>
      </View >

      {update()}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell>id</TableCell>
              <TableCell align="right">URL</TableCell>
              <TableCell align="right">title</TableCell>
              <TableCell align="right">author</TableCell>
              <TableCell align="right">width</TableCell>
              <TableCell align="right">height</TableCell>
              <TableCell align="right">duration</TableCell>
              <TableCell align="right">keyWord</TableCell>
              <TableCell align="right">createdAt</TableCell>
              <TableCell align="right">updatedAt</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((row) => (
              <TableRow>
                <TableCell component="th" scope="row">
                  <a href={row.URL} target="_blank">
                    {row.id}</a>
                </TableCell>
                <TableCell align="right">{row.URL}</TableCell>
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">{row.author}</TableCell>
                <TableCell align="right">{row.width}</TableCell>
                <TableCell align="right">{row.height}</TableCell>
                <TableCell align="right">{row.duration}</TableCell>
                <TableCell align="right" onClick={(event) => handleClick(event, row.id)} >{row.keyWord}</TableCell>
                <TableCell align="right">{row.createdAt}</TableCell>
                <TableCell align="right">{row.updatedAt}</TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={movieNumber}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    flexDirection: "row"
  },
});

export default App;
