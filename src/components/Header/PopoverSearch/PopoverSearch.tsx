import { Input, Popover } from "@base-ui-components/react"
import "./PopoverSearch.scss"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { Autocomplete, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { ContentItem, TitleData } from "../../../types/title"
import { fetchMoviesAllTitle, setAllTitle, setGalleryMovie } from "../../../app/store"

function BellIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="33"
      height="32"
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.7998 28L18.3998 19.6C17.7332 20.1333 16.9665 20.5556 16.0998 20.8667C15.2332 21.1778 14.3109 21.3333 13.3332 21.3333C10.9109 21.3333 8.86095 20.4944 7.18317 18.8167C5.50539 17.1389 4.6665 15.0889 4.6665 12.6667C4.6665 10.2444 5.50539 8.19444 7.18317 6.51667C8.86095 4.83889 10.9109 4 13.3332 4C15.7554 4 17.8054 4.83889 19.4832 6.51667C21.1609 8.19444 21.9998 10.2444 21.9998 12.6667C21.9998 13.6444 21.8443 14.5667 21.5332 15.4333C21.2221 16.3 20.7998 17.0667 20.2665 17.7333L28.6665 26.1333L26.7998 28ZM13.3332 18.6667C14.9998 18.6667 16.4165 18.0833 17.5832 16.9167C18.7498 15.75 19.3332 14.3333 19.3332 12.6667C19.3332 11 18.7498 9.58333 17.5832 8.41667C16.4165 7.25 14.9998 6.66667 13.3332 6.66667C11.6665 6.66667 10.2498 7.25 9.08317 8.41667C7.9165 9.58333 7.33317 11 7.33317 12.6667C7.33317 14.3333 7.9165 15.75 9.08317 16.9167C10.2498 18.0833 11.6665 18.6667 13.3332 18.6667Z"
        fill="#F1F3F3"
      />
    </svg>
  )
}

function ArrowSvg(props: React.ComponentProps<"svg">) {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" {...props}>
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        className="fill-[canvas]"
      />
      <path
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
        className="fill-gray-200 dark:fill-none"
      />
      <path
        d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
        className="dark:fill-gray-300"
      />
    </svg>
  )
}



export default function PopoverSearch() {
  const { movies } = useAppSelector(state => state)
  const loading = movies?.loading
  const [content, setContent] = useState<ContentItem[]>([])
  const [search, setSearch] = useState("")
  const [filteredMovies, setFilteredMovies] = useState<ContentItem[]>([])
  const navigate = useNavigate()
  const dispatch = useAppDispatch()


  const handleEndSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const isHowManyMovies = filteredMovies.length;

      if (isHowManyMovies === 1) {
        navigate(`../movie?idMovie=${filteredMovies[0].id}`)
      } else {
        navigate(`../gallery?search=${search}`)
      }
    }
  };

  useEffect(() => {
    if (Array.isArray(movies?.title?.content)) {
      const sortedContent = movies.title.content
        .slice()
        .sort((a, b) => a.title.localeCompare(b.title))
      setContent(sortedContent)
      setFilteredMovies(sortedContent)
    }
  }, [movies])

  const handleSearchChange = (_: any, value: ContentItem | null) => {
    if (value) {
      navigate(`../movie?idMovie=${value.id}`)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setSearch(query)

    if (!query.trim()) {
      setFilteredMovies(content)
    } else {
      const filtered = content.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase()),
      ).slice(0, 100)
      setFilteredMovies(filtered)
    }
  }

  const handleSatrtSearch = (isOpen: boolean) => {
    if (isOpen) {
      dispatch(fetchMoviesAllTitle())
    }
  }

  return (
    <Popover.Root
      onOpenChange={handleSatrtSearch}
    >
      <Popover.Trigger className={"popover"}>
        <BellIcon className={"popover-icon"} />
      </Popover.Trigger>
      {!loading && (
        <Popover.Portal className={"popover-portal-container"}>
          <Popover.Positioner sideOffset={12}>
            <Popover.Popup className={"popover-portal"}>
              <div className="popover-portal-search">
                <Autocomplete
                  options={filteredMovies}
                  getOptionLabel={option => option.title}
                  onChange={handleSearchChange}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      {option.title}
                    </li>
                  )}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label=" "
                      onChange={handleInputChange}
                      value={search}
                      onKeyDown={
                        (handleEndSearch)
                      }
                    />
                  )}


                  noOptionsText="No movies found"
                  sx={{
                    backgroundColor: "#d9d9d9",
                    borderRadius: "8px",
                    width: 300,
                    color: "#e83f14",
                    zIndex: 1000,
                    "& .MuiInputLabel-root": {
                      display: "none",
                      "& .MuiFormLabel-root ": {
                        color: "#fff",
                      },
                    },
                    "& .MuiOutlinedInput-root": {
                      zIndex: 1000,

                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#fff",
                        borderRadius: "8px",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#fff",
                        borderRadius: "8px",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#fff",
                        borderRadius: "8px",
                      },
                      color: "#000",
                    },
                    "& .MuiAutocomplete-option": {
                      // color: '#000',
                      color: "#e83f14",
                    },
                  }}
                />
              </div>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      )}
    </Popover.Root>
  )
}
