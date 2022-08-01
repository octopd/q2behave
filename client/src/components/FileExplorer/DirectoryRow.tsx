import { Download } from '@mui/icons-material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import {
  Box,
  Checkbox,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { MouseEvent, useState } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { bytesToSize } from '../../helpers/bytesToSize'
import { Directory, FILE_SELECTED_LIST_REQUEST } from '../../modules/storage'

interface Props {
  directory: Directory
}

const DirectoryRow = ({ directory }: Props) => {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)

  const { selected } = useSelector((state: RootStateOrAny) => state.storage)
  const isSelected = (name: string) => selected.indexOf(name) !== -1

  const isItemSelected = isSelected(directory.name)
  const labelId = `enhanced-table-checkbox-${directory.name}`

  const handleClick = (event: MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    dispatch({ type: FILE_SELECTED_LIST_REQUEST, payload: newSelected })
  }

  return (
    <>
      <TableRow
        hover
        onClick={(event) => handleClick(event, directory.name)}
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={directory.name}
        selected={isItemSelected}
      >
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            // indeterminate={numSelected > 0 && numSelected < rowCount}
            // checked={rowCount > 0 && numSelected === rowCount}
            // onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        <TableCell component="th" id={labelId}>
          {directory.name}
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell component="th" id={labelId}>
          {directory.files.length}
        </TableCell>

        <TableCell component="th" id={labelId}>
          {directory.size}
        </TableCell>
      </TableRow>
      <TableRow sx={{ '& > *': { borderBottom: 'none' } }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        // indeterminate={numSelected > 0 && numSelected < rowCount}
                        // checked={rowCount > 0 && numSelected === rowCount}
                        // onChange={onSelectAllClick}
                        inputProps={{
                          'aria-label': 'select all desserts',
                        }}
                      />
                    </TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {directory.files.map((file) => (
                    <TableRow key={file.name}>
                      <TableCell>
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {file.name}
                      </TableCell>

                      <TableCell component="th" scope="row">
                        {bytesToSize(file.properties.contentLength)}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton>
                          <Download />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default DirectoryRow
