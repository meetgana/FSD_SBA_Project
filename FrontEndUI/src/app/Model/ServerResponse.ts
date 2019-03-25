export interface ServerResponse<data>
{
    Success : boolean,
    Data : data,
    Message? : string
}